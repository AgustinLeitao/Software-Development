targetScope = 'subscription'

param environmentName string
param location string = 'eastus'
param aksNodeCount int = 1
param agentVMSize string = 'standard_d2as_v7'
param acrSku string = 'Basic'
param enableAutoScaling bool = false
param minCount int = 1
param maxCount int = 3

var rgName = toLower('todoapp-${environmentName}-rg')
var acrName = toLower('todoapp${environmentName}acr')
var aksName = toLower('todoapp-${environmentName}-aks')
var dnsPrefix = toLower('todoapp-${environmentName}-dns')

resource rg 'Microsoft.Resources/resourceGroups@2025-04-01' = {
  name: rgName
  location: location
}

module aksCluster './components/aks.bicep' = {
  name: 'aksModule'
  scope: rg
  params: {
    aksNodeCount: aksNodeCount
    agentVMSize: agentVMSize
    acrSku: acrSku
    location: location
    aksName: aksName
    dnsPrefix: dnsPrefix
    acrName: acrName
    enableAutoScaling: enableAutoScaling
    minCount: minCount
    maxCount: maxCount
  }
}

output acrLoginServer string = aksCluster.outputs.acrLoginServer
output acrName string = aksCluster.outputs.acrName
output resourceGroupName string = rg.name
output aksClusterName string = aksCluster.outputs.aksClusterName
