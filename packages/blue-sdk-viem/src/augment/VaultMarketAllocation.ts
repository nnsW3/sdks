import { VaultMarketAllocation } from "@morpho-org/blue-sdk";

import {
  fetchVaultMarketAllocation,
  fetchVaultMarketAllocationFromConfig,
} from "../fetch";

declare module "@morpho-org/blue-sdk" {
  namespace VaultMarketAllocation {
    let fetch: typeof fetchVaultMarketAllocation;
    let fetchFromConfig: typeof fetchVaultMarketAllocationFromConfig;
  }
}

VaultMarketAllocation.fetch = fetchVaultMarketAllocation;
VaultMarketAllocation.fetchFromConfig = fetchVaultMarketAllocationFromConfig;
