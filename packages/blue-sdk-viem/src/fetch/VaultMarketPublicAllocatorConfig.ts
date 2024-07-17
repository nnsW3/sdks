import {
  Account,
  Address,
  Chain,
  ParseAccount,
  PublicClient,
  RpcSchema,
  Transport,
} from "viem";

import {
  ChainId,
  ChainUtils,
  MarketId,
  VaultMarketPublicAllocatorConfig,
  getChainAddresses,
} from "@morpho-org/blue-sdk";
import { publicAllocatorAbi } from "../abis";
import { ViewOverrides } from "../types";

export async function fetchVaultMarketPublicAllocatorConfig<
  transport extends Transport,
  chain extends Chain | undefined,
  account extends Account | undefined,
  rpcSchema extends RpcSchema | undefined,
>(
  vault: Address,
  marketId: MarketId,
  client: PublicClient<transport, chain, ParseAccount<account>, rpcSchema>,
  {
    chainId,
    overrides = {},
  }: { chainId?: ChainId; overrides?: ViewOverrides } = {},
) {
  chainId = ChainUtils.parseSupportedChainId(
    chainId ?? (await client.getChainId()),
  );

  const { publicAllocator } = getChainAddresses(chainId);

  if (!publicAllocator) return;

  const [maxIn, maxOut] = await client.readContract({
    ...overrides,
    address: publicAllocator as Address,
    abi: publicAllocatorAbi,
    functionName: "flowCaps",
    args: [vault, marketId],
  });

  return new VaultMarketPublicAllocatorConfig({
    vault,
    marketId,
    maxIn,
    maxOut,
  });
}
