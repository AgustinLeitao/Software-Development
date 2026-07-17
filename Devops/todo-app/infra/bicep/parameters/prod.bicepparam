using '../main.bicep'

param environmentName = 'prod'
param location = 'eastus'
param aksNodeCount = 3
param agentVMSize = 'standard_d2as_v7'
param enableAutoScaling = true
param minCount = 3
param maxCount = 5
