targetScope = 'subscription'

param location string = 'eastus'
param acrSku string = 'Basic'

var rgName = 'todoapp-shared-rg'
var acrName = 'todoappsahredacr'

resource rg 'Microsoft.Resources/resourceGroups@2025-04-01' = {
  name: rgName
  location: location
}

module sharedAcr './components/acr.bicep' = {
  name: 'sharedAcrModule'
  scope: rg
  params: {
    acrName: acrName
    acrSku: acrSku
    location: location
  }
}

output acrId string = sharedAcr.outputs.acrId
output acrLoginServer string = sharedAcr.outputs.acrLoginServer
output acrName string = sharedAcr.outputs.acrName
output resourceGroupName string = rg.name
