import { useContract, useNFTs } from "@thirdweb-dev/react";
import React, { useState } from "react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";
import styles from "../styles/Buy.module.css";
import Filter from "../components/Filter/Filter";

export default function Buy() {
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(contract);

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({
    "Backgrounds": "",
    "Left Eye": "",
    "Right Eye": "",
    "Mouth": ""
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value
    }));
  };

  const filterNFTs = (nft: any) => {
    const { attributes } = nft.metadata;
    return (
      (!selectedFilters["Backgrounds"] || attributes.find((attr: any) => attr.trait_type === "Backgrounds" && attr.value === selectedFilters["Backgrounds"])) &&
      (!selectedFilters["Left eye"] || attributes.find((attr: any) => attr.trait_type === "Left eye" && attr.value === selectedFilters["Left eye"])) &&
      (!selectedFilters["Right eye"] || attributes.find((attr: any) => attr.trait_type === "Right eye" && attr.value === selectedFilters["Right eye"])) &&
      (!selectedFilters["Mouth"] || attributes.find((attr: any) => attr.trait_type === "Mouth" && attr.value === selectedFilters["Mouth"]))
    );
  };

  const filteredData = data?.filter(filterNFTs);

  return (
    <Container maxWidth="lg">
      <div>
        <h1>Buy NFTs</h1>
        <p>Browse which NFTs are available from the collection.</p>
      </div>

      <div className={styles.filters}>
        <Filter
          label="Background"
          options={Array.from(
            new Set(
              filteredData?.flatMap((nft: any) =>
                nft.metadata.attributes
                  .filter((attr: any) => attr.trait_type === "Backgrounds")
                  .map((attr: any) => attr.value)
              )
            )
          ).sort()}
          value={selectedFilters["Backgrounds"]}
          onChange={(value) => handleFilterChange("Backgrounds", value)}
        />

        <Filter
          label="Left Eye"
          options={Array.from(
            new Set(
              filteredData?.flatMap((nft: any) =>
                nft.metadata.attributes
                  .filter((attr: any) => attr.trait_type === "Left eye")
                  .map((attr: any) => attr.value)
              )
            )
          ).sort()}
          value={selectedFilters["Left eye"]}
          onChange={(value) => handleFilterChange("Left eye", value)}
        />

        <Filter
          label="Right Eye"
          options={Array.from(
            new Set(
              filteredData?.flatMap((nft: any) =>
                nft.metadata.attributes
                  .filter((attr: any) => attr.trait_type === "Right eye")
                  .map((attr: any) => attr.value)
              )
            )
          ).sort()}
          value={selectedFilters["Right eye"]}
          onChange={(value) => handleFilterChange("Right eye", value)}
        />

        <Filter
          label="Mouth"
          options={Array.from(
            new Set(
              filteredData?.flatMap((nft: any) =>
                nft.metadata.attributes
                  .filter((attr: any) => attr.trait_type === "Mouth")
                  .map((attr: any) => attr.value)
              )
            )
          ).sort()}
          value={selectedFilters["Mouth"]}
          onChange={(value) => handleFilterChange("Mouth", value)}
        />
      </div>


      <NFTGrid
        data={filteredData}
        isLoading={isLoading}
        emptyText="Looks like there are no NFTs matching the selected filters."
      />
    </Container>
  );
}