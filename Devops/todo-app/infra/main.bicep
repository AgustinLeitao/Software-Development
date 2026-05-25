param environmentName string
param location string = resourceGroup().location
param aksNodeCount int = 1
param agentVMSize string = 'Standard_D2s_v3'
param acrSku string = 'Basic'

var acrName = toLower('todoapp${environmentName}acr')
var aksName = toLower('todoapp-${environmentName}-aks')
var logAnalyticsName = toLower('todoapp-${environmentName}-logs')
var dnsPrefix = toLower('todoapp-${environmentName}-dns')

resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2023-11-01-preview' = {
  name: logAnalyticsName
  location: location
  properties: {
    sku: {
      name: 'PerGB2018'
    }
  }
}

resource acr 'Microsoft.ContainerRegistry/registries@2024-01-01-preview' = {
  name: acrName
  location: location
  sku: {
    name: acrSku
  }
  properties: {
    adminUserEnabled: false
  }
}

resource aks 'Microsoft.ContainerService/managedClusters@2024-03-01' = {
  name: aksName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    dnsPrefix: dnsPrefix
    agentPoolProfiles: [
      {
        name: 'agentpool'
        count: aksNodeCount
        vmSize: agentVMSize
        osType: 'Linux'
        mode: 'System'
      }
    ]
    networkProfile: {
      networkPlugin: 'azure'
    }
    addonProfiles: {
      omsagent: {
        enabled: true
        config: {
          logAnalyticsWorkspaceResourceID: logAnalytics.id
        }
      }
    }
    enableRBAC: true
  }
}

resource acrPullRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(aks.id, acr.id, 'acrpull')
  scope: acr
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '7f951dda-4ed3-4680-a7ca-43fe172d538d')
    principalId: aks.identity.principalId
    principalType: 'ServicePrincipal'
  }
}

output acrLoginServer string = acr.properties.loginServer
output acrName string = acr.name
output aksClusterName string = aks.name
output aksResourceGroup string = resourceGroup().name
output logAnalyticsWorkspaceId string = logAnalytics.id
