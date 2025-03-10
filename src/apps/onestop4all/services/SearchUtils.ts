export const areSearchParamsEqual = (currentParams: any, previousParams: any) => {
    const searchTermNew = currentParams.get("searchterm");
    const searchTermOld = previousParams?.get("searchterm") || null;

    const dataProviderNew = currentParams.getAll("dataProvider");
    const dataProviderOld = previousParams?.getAll("dataProvider") || [];

    const downloadLinkNew = currentParams.get("rdl");
    const downloadLinkOld = previousParams?.get("rdl") || null;

    const spatialFilterNew = currentParams.get("spatialfilter");
    const spatialFilterOld = previousParams?.get("spatialfilter") || null;

    const arraysAreEqual = (arr1: string[], arr2: string[]) => {
        if (arr1.length !== arr2.length) return false;
        return arr1.slice().sort().join() === arr2.slice().sort().join(); // Sort a copy to avoid mutation
    };

    return (
        searchTermNew === searchTermOld &&
        arraysAreEqual(dataProviderNew, dataProviderOld) &&
        downloadLinkNew === downloadLinkOld &&
        spatialFilterNew === spatialFilterOld
    );
};