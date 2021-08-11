(() => {
    const userId = "c4da436c-2759-d4e6-4adb-efc90d0a7ab8";  //guid of user
    const columnToSort = "Support Group";
    const direction = "asc" //ascending

    const COLUMN_NOT_FOUND = "Couldn't find the column you're looking for...";

    if (session.user.Id === userId) {
        const pageId = app.getNavNodeIdFromUrl();
        const sortGrid = (event,xhr,settings) => {
            if (settings.url.indexOf('GetPromotedView') > -1) { //wait for the call to GetPromotedView so we know the grid is loaded
                const gridElement = $('#' + pageId);
                const grid = gridElement.data('kendoGrid');
                if (grid) {
                    const dataSource = grid.dataSource;
                    const column = grid.columns.find(c => c.title && c.title.toLowerCase() === columnToSort.toLowerCase());
                    if (column) {
                        dataSource.sort([{field: column.field, dir: direction}]); //sort the grid
                    }
                    else {
                        console.log(COLUMN_NOT_FOUND)
                    }
                }
                $(document).unbind('ajaxSuccess', sortGrid); //only run once
            }
        }
        $(document).bind('ajaxSuccess', sortGrid);
    }
})();