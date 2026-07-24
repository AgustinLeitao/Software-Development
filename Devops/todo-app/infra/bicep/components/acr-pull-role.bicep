targetScope = 'resourceGroup'

param sharedAcrName string
param kubeletIdentityObjectId string

resource sharedAcr 'Microsoft.ContainerRegistry/registries@2025-11-01' existing = {
  name: sharedAcrName
}

resource acrPullRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(sharedAcr.id, kubeletIdentityObjectId, 'AcrPull')
  scope: sharedAcr
  properties: {
    principalId: kubeletIdentityObjectId
    roleDefinitionId: subscriptionResourceId(
      'Microsoft.Authorization/roleDefinitions',
      '7f951dda-4ed3-4680-a7ca-43fe172d538d'
    )
    principalType: 'ServicePrincipal'
  }
}
