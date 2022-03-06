import moment from "moment";
import {Chart, VideoType} from "../types/types";

export function groupByMonth(data: VideoType[], chart: Chart) {
    const months = [...Array.from(new Set(data.map((item) => moment(item["upload_date"]).format("MM-YYYY"))))];

    let groupedData = [];

    for(let month of months) {
        let videos = data.filter(item => moment(item["upload_date"]).format("MM-YYYY") === month);
        // @ts-ignore
        videos = videos.sort((a: VideoType, b: VideoType) => a[chart.metric] - b[chart.metric]);
        groupedData.push(videos[ Math.floor((videos.length-1) / 2) ]);
    }

    return groupedData;
}