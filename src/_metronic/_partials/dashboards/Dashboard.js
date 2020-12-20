import React /*, {useMemo} */ from "react";


// import objectPath from "object-path";
// import {useHtmlClassService} from "../../layout";

import MainDashboard from "./MainDashboard";

//temprary dashboard
// import {Demo1Dashboard} from "./Demo1Dashboard";
// import {Demo2Dashboard} from "./Demo2Dashboard";
// import {Demo4Dashboard} from "./Demo4Dashboard";
// import {Demo5Dashboard} from "./Demo5Dashboard";
// import {Demo6Dashboard} from "./Demo6Dashboard";
// import {Demo7Dashboard} from "./Demo7Dashboard";

export function Dashboard() {
    // const uiService = useHtmlClassService();
    //dynamic dashboard selector for per theme
    // const layoutProps = useMemo(() => {
    //     return {
    //         demo: objectPath.get(
    //             uiService.config,
    //             "demo"
    //         )};
    // }, [uiService]);
    return <>
            <MainDashboard/>
    </>;
}
