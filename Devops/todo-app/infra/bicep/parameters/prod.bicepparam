using '../main.bicep'

param environmentName = 'prod'
param location = 'eastus'
param aksNodeCount = 1
param agentVMSize = 'standard_d2as_v7'
param enableAutoScaling = true
param minCount = 1
param maxCount = 1
param sharedAcrId = ''
