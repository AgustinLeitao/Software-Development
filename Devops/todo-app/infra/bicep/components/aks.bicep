param location string = 'eastus'
param aksNodeCount int = 1
param agentVMSize string = 'Standard_D2s_v3'
param acrSku string = 'Basic'
param acrName string
param aksName string
param dnsPrefix string

resource acr 'Microsoft.ContainerRegistry/registries@2025-11-01' = {
  name: acrName
  location: location
  sku: {
    name: acrSku
  }
  properties: {
    adminUserEnabled: true
  }
}

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
      }
    ]
    enableRBAC: true
  }
}

output acrLoginServer string = acr.properties.loginServer
output acrName string = acr.name
output aksClusterName string = aks.name
