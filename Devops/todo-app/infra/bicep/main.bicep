targetScope = 'subscription'

param environmentName string
param location string = 'eastus'
param aksNodeCount int = 1
param agentVMSize string = 'standard_d2as_v7'
param enableAutoScaling bool = false
param minCount int = 1
param maxCount int = 3

param sharedAcrId string

var rgName = toLower('todoapp-${environmentName}-rg')
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
    location: location
    aksName: aksName
    dnsPrefix: dnsPrefix
    sharedAcrId: sharedAcrId
    enableAutoScaling: enableAutoScaling
    minCount: minCount
    maxCount: maxCount
  }
}

output resourceGroupName string = rg.name
output aksClusterName string = aksCluster.outputs.aksClusterName
