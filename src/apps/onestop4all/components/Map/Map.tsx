// SPDX-FileCopyrightText: con terra GmbH and contributors
// SPDX-License-Identifier: Apache-2.0
import { Box } from "@open-pioneer/chakra-integration";
import { MapContainer, MapPadding } from "@open-pioneer/experimental-ol-map";
import { useService } from "open-pioneer:react-hooks";
import { useState } from "react";
import { useAsync } from "react-use";

import { MAP_ID } from "./services";

const berlin = [1489200, 6894026, 1489200, 6894026];

export function Map() {
    const [viewPadding, setViewPadding] = useState<MapPadding>();

    const olMapRegistry = useService("ol-map.MapRegistry");
    const mapState = useAsync(async () => await olMapRegistry.getMap(MAP_ID));

    if (mapState.value) {
        mapState.value.getView().fit(berlin, { maxZoom: 13 });
    }

    return (
        <Box w="100%" h="70vh" overflow="hidden" position="relative" flex="1">
            <MapContainer mapId={MAP_ID} viewPadding={viewPadding} />
        </Box>
    );
}
