using '../main.bicep'

param environmentName = 'prod'
param location = 'eastus'
param aksNodeCount = 2
param agentVMSize = 'standard_d2as_v7'
param enableAutoScaling = true
param minCount = 2
param maxCount = 2
param sharedAcrId = ''
