# Infrastructure Deployment

This folder contains Azure infrastructure templates and environment parameter files.

## Deploy an environment

Use the Azure CLI to deploy the required resources.

```powershell
az deployment group create \
  --resource-group <resource-group-name> \
  --template-file infra/main.bicep \
  --parameters infra/parameters/dev.parameters.json
```

Replace `dev.parameters.json` with `qa.parameters.json` or `prod.parameters.json` for the corresponding environment.

## Outputs

- `acrLoginServer` — ACR login server
- `acrName` — Azure Container Registry name
- `aksClusterName` — AKS cluster name
- `aksResourceGroup` — AKS resource group
- `logAnalyticsWorkspaceId` — Log Analytics resource ID

## Notes

- The Bicep template creates an ACR registry, a Log Analytics workspace, and an AKS cluster.
- It also assigns the AKS cluster permission to pull images from ACR.
- For production, you can increase `aksNodeCount` and choose a larger `agentVMSize`.
