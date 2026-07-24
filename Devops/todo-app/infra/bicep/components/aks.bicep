param location string = 'eastus'
param aksNodeCount int = 1
param agentVMSize string = 'standard_d2as_v7'
param aksName string
param dnsPrefix string
param enableAutoScaling bool = false
param minCount int = 1
param maxCount int = 3

param sharedAcrId string
param sharedAcrResourceGroup string = split(sharedAcrId, '/')[4]
param sharedSubscriptionId string = split(sharedAcrId, '/')[2]

resource aks 'Microsoft.ContainerService/managedClusters@2026-02-01' = {
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
        enableAutoScaling: enableAutoScaling
        minCount: enableAutoScaling ? minCount : null
        maxCount: enableAutoScaling ? maxCount : null
      }
    ]
    enableRBAC: true
  }
}

module acrPullRole './acr-pull-role.bicep' = {
  name: 'acrPullRoleAssignment'
  scope: resourceGroup(sharedSubscriptionId, sharedAcrResourceGroup)
  params: {
    sharedAcrName: last(split(sharedAcrId, '/'))
    kubeletIdentityObjectId: aks.properties.identityProfile.kubeletidentity.objectId
  }
}

output aksClusterName string = aks.name
