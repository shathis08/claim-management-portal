using System;
using Microsoft.Xrm.Sdk;

namespace InsuranceClaimPlugin
{
    public class PreValidateClaim : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            // 1. Extract the tracing service (used for writing debug logs)
            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            // 2. Extract the execution context (contains data about the event happening in Dataverse)
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            // 3. Verify that the incoming data contains a 'Target' and that it is an Entity (a data row)
            if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
            {
                // Access the actual row being created
                Entity claimEntity = (Entity)context.InputParameters["Target"];
                                
                if (claimEntity.LogicalName != "cr5db_insuranceclaim")
                {
                    return;
                }

                tracingService.Trace("Plugin triggered successfully for crabc_pruclaim.");

                // 4. Core Business Logic: Validate the Claim Amount               
                if (claimEntity.Contains("cr5db_claimamount"))
                {                    
                    Money claimAmount = (Money)claimEntity["cr5db_claimamount"];

                    // If a user types 0 or a negative number, block the submission
                    if (claimAmount.Value <= 0)
                    {
                        tracingService.Trace("Validation failed: Claim amount is less than or equal to 0.");

                        // Throwing this specific exception pops up a clean warning window to the user in the app
                        throw new InvalidPluginExecutionException("Business Rule Violation: The claim request amount must be greater than RM 0.00.");
                    }
                }
            }
        }
    }
}