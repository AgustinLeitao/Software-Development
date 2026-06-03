targetScope = 'subscription'

param environmentName string
param location string = 'eastus'
param aksNodeCount int = 1
param agentVMSize string = 'standard_dc2ds_v3'
param acrSku string = 'Basic'

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
  }
}

output acrLoginServer string = aksCluster.outputs.acrLoginServer
output acrName string = aksCluster.outputs.acrName
output resourceGroupName string = rg.name
output aksClusterName string = aksCluster.outputs.aksClusterName
