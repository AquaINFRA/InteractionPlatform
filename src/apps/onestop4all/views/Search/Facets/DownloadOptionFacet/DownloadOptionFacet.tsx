import React, { useEffect, useState } from "react";
import { Flex, FormControl, FormLabel } from "@open-pioneer/chakra-integration";
import { useService } from "open-pioneer:react-hooks";
import { SimpleGrid, Switch } from "@chakra-ui/react";
import { SelectableDataProvider, useSearchState } from "../../SearchState";
import { FacetBase } from "../FacetBase/FacetBase";
import { FacetCheckbox } from "../FacetBase/FacetCheckbox";

export interface DownloadOption {
    downloadOption: string;
}

export function DownloadOptionFacet() {

    const searchState = useSearchState();
    //console.log(searchState);

    // useEffect to react to changes in showDownloadLinks
    useEffect(() => {
        // Here you can perform actions based on the value of showDownloadLinks
        if (searchState.downloadOption) {
            // Action when download links should be shown
            console.log("Download links are shown.");
        } else {
            // Action when download links should be hidden
            console.log("Download links are hidden.");
        }
    }, [searchState.downloadOption]);

    // Function to handle switcher change
    const handleSwitcherChange = () => {
        searchState.setDownloadOption(!searchState.downloadOption as unknown as string);
    };

    return (
        <FacetBase title="Download links" expanded>
            <FormControl display='flex' alignItems='center'>
                <FormLabel htmlFor='download-links' mb='0' style={{color: "#05668D", fontFamily: "Open Sans" , fontSize: "14px", fontWeight: "400"}}>
                    Show only entries that have a download link?
                </FormLabel>
                <Switch id='download-links' onChange={handleSwitcherChange} isChecked={searchState.downloadOption ? true : false} />
            </FormControl>
        </FacetBase>
    );
}
