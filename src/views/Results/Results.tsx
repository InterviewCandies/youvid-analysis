//@ts-nocheck

import {Card, CardContent, CardHeader, CircularProgress, Grid, makeStyles, useTheme} from "@material-ui/core";
import NavBar from "../../components/Navbar/NavBar";
import ComboBox from "../../components/ComboBox/ComboBox";
import React, {useEffect, useState} from "react";
import {readCSV} from "../../utils/readCSV";
import ReactPlayer from "react-player";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        backgroundColor: "#1e2328",
    },
    container: {
        padding: '2rem',
        color: "#fff"
    },
    heading: {
        fontWeight: "bold",
        fontSize: '1.2rem'
    },
    card: {
        color: "#000",
    },
    row: {
        display: "grid",
        gap: '1rem',
        gridTemplateColumns: "1fr 1fr 1fr"
    },
    video: {
        display: "flex",
    },
}));

const LEVEL_COLOR = {
    HIGH: "#f57f17",
    MEDIUM: "#fbc02d",
    LOW: "#ffeb3b"
}

function MiniCard(props : {title: string, content: string, color: string, active?: boolean}) {
    const classes = useStyles();
    const theme = useTheme();

    return <Card className={classes.card} style={{backgroundColor: props.color, border: props.active ?  `5px solid ${theme.palette.primary.dark}` : "none"}}>
        <CardContent>
            <p>{props.title}</p>
            <p style={{fontWeight:"bold", fontSize: "1.2rem", margin: 0}}>{Number(props.content).toFixed(3)}</p>
        </CardContent>
    </Card>
}

function Label({label}: {label: string}) {
   let color = LEVEL_COLOR.LOW;
    if (label == 'Medium engagement')
        color = LEVEL_COLOR.MEDIUM;
    if (label == 'High engagement')
        color  = LEVEL_COLOR.HIGH;

    return <span style={{color: color}}>{label}</span>
}

function getMax(a, b, c) {
    return Math.max(Number(a), Number(b), Number(c)) == Number(a);
}

function Results() {
    const classes = useStyles();
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        async function getData() {
            let parsedData = (await readCSV("/video_score.csv")) as [];
            setVideos(parsedData);
        }
        getData();
    }, []);

    return <div className={classes.root}>
        <NavBar/>
        <Grid container className={classes.container}>
            <Grid item xs={12} lg={6}>
                <div style={{margin: "1rem 0 3rem 0"}}>
                    <ComboBox
                        color={"secondary"}
                        options={videos}
                        getOptionLabel={option => option.video_id as string}
                        onChange={(event, value) => setCurrentVideo(value)}
                        placeholder="Select video"
                    ></ComboBox>
                </div>
                {currentVideo &&
                    <>
                        <div>
                            <h2>Label: <Label label={currentVideo['label']}/></h2>
                        </div>
                        <div className={classes.video}>
                            <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${currentVideo.video_id}`}
                            fallback={<CircularProgress></CircularProgress>}
                            playing
                            config={{
                            youtube: {
                            playerVars: {showinfo: 1},
                            },
                            }}></ReactPlayer>
                        </div>
                    </>
                }
            </Grid>
            <Grid item xs={12} lg={6}>
                { currentVideo ?
                    <div>
                        <div>
                            <p className={classes.heading}>Title</p>
                            <div className={classes.row}>
                                <MiniCard title={"Low"}
                                          content={currentVideo["video_tile_low_engagement"]}
                                          color={LEVEL_COLOR.LOW}
                                          active={getMax(
                                                  currentVideo["video_tile_low_engagement"],
                                                  currentVideo["video_title_medium_engagement"],
                                                  currentVideo["video_title_high_engagement"]
                                                  )}>
                                </MiniCard>
                                <MiniCard title={"Medium"}
                                          content={currentVideo["video_title_medium_engagement"]}
                                          color={LEVEL_COLOR.MEDIUM}
                                          active={getMax(
                                              currentVideo["video_title_medium_engagement"],
                                              currentVideo["video_tile_low_engagement"],
                                              currentVideo["video_title_high_engagement"]
                                          )}></MiniCard>
                                <MiniCard title={"High"}
                                          content={currentVideo["video_title_high_engagement"]}
                                          color={LEVEL_COLOR.HIGH}
                                          active={getMax(
                                              currentVideo["video_title_high_engagement"],
                                              currentVideo["video_title_medium_engagement"],
                                              currentVideo["video_tile_low_engagement"],
                                          )}>
                                </MiniCard>
                            </div>
                        </div>
                        <div>
                            <p className={classes.heading}>Audio</p>
                            <div className={classes.row}>
                                <MiniCard title={"Low"}
                                          content={currentVideo["video_audio_low_engagement"]}
                                          color={LEVEL_COLOR.LOW}
                                          active={getMax(
                                              currentVideo["video_audio_low_engagement"],
                                              currentVideo["video_audio_medium_engagement"],
                                              currentVideo["video_audio_high_engagement"],
                                          )}>
                                </MiniCard>
                                <MiniCard title={"Medium"}
                                          content={currentVideo["video_audio_medium_engagement"]}
                                          color={LEVEL_COLOR.MEDIUM}
                                          active={getMax(
                                              currentVideo["video_audio_medium_engagement"],
                                              currentVideo["video_audio_low_engagement"],
                                              currentVideo["video_audio_high_engagement"],
                                          )}>
                                </MiniCard>
                                <MiniCard title={"High"}
                                          content={currentVideo["video_audio_high_engagement"]}
                                          color={LEVEL_COLOR.HIGH}
                                          active={getMax(
                                                currentVideo["video_audio_high_engagement"],
                                                currentVideo["video_audio_medium_engagement"],
                                                currentVideo["video_audio_low_engagement"],
                                )}></MiniCard>
                            </div>
                        </div>
                        <div>
                            <p className={classes.heading}>Thumbnail</p>
                            <div className={classes.row}>
                                <MiniCard title={"Low"}
                                          content={currentVideo["video_thumbnail_low_engagement"]}
                                          color={LEVEL_COLOR.LOW}
                                          active={getMax(
                                              currentVideo["video_thumbnail_low_engagement"],
                                              currentVideo["video_thumbnail_medium_engagement"],
                                              currentVideo["video_thumbnail_high_engagement"],
                                          )}></MiniCard>
                                <MiniCard title={"Medium"}
                                          content={currentVideo["video_thumbnail_medium_engagement"]}
                                          color={LEVEL_COLOR.MEDIUM}
                                          active={getMax(
                                              currentVideo["video_thumbnail_medium_engagement"],
                                              currentVideo["video_thumbnail_low_engagement"],
                                              currentVideo["video_thumbnail_high_engagement"],
                                          )}></MiniCard>
                                <MiniCard title={"High"}
                                          content={currentVideo["video_thumbnail_high_engagement"]}
                                          color={LEVEL_COLOR.HIGH}
                                          active={getMax(
                                              currentVideo["video_thumbnail_high_engagement"],
                                              currentVideo["video_thumbnail_medium_engagement"],
                                              currentVideo["video_thumbnail_low_engagement"],
                                          )}></MiniCard>
                            </div>
                        </div>
                        <div>
                            <p className={classes.heading}>Transcript</p>
                            <div className={classes.row}>
                                <MiniCard title={"Low"}
                                          content={currentVideo["video_transcript_low_engagement"]}
                                          color={LEVEL_COLOR.LOW}
                                          active={getMax(
                                              currentVideo["video_transcript_low_engagement"],
                                              currentVideo["video_transcript_medium_engagement"],
                                              currentVideo["video_transcript_high_engagement"],
                                          )}></MiniCard>
                                <MiniCard title={"Medium"}
                                          content={currentVideo["video_transcript_medium_engagement"]}
                                          color={LEVEL_COLOR.MEDIUM}
                                          active={getMax(
                                              currentVideo["video_transcript_medium_engagement"],
                                              currentVideo["video_transcript_low_engagement"],
                                              currentVideo["video_transcript_high_engagement"],
                                          )}></MiniCard>
                                <MiniCard title={"High"}
                                          content={currentVideo["video_transcript_high_engagement"]}
                                          color={LEVEL_COLOR.HIGH}
                                          active={getMax(
                                              currentVideo["video_transcript_high_engagement"],
                                              currentVideo["video_transcript_medium_engagement"],
                                              currentVideo["video_transcript_low_engagement"],
                                          )}></MiniCard>
                            </div>
                        </div>
                        <div>
                            <p className={classes.heading}>Frame</p>
                            <div className={classes.row}>
                                <MiniCard title={"Low"}
                                          content={currentVideo["video_frame_low_engagement"]}
                                          color={LEVEL_COLOR.LOW}
                                          active={getMax(
                                              currentVideo["video_frame_low_engagement"],
                                              currentVideo["video_frame_medium_engagement"],
                                              currentVideo["video_frame_high_engagement"],
                                          )}></MiniCard>
                                <MiniCard title={"Medium"}
                                          content={currentVideo["video_frame_medium_engagement"]}
                                          color={LEVEL_COLOR.MEDIUM}
                                          active={getMax(
                                              currentVideo["video_frame_medium_engagement"],
                                              currentVideo["video_frame_low_engagement"],
                                              currentVideo["video_frame_high_engagement"],
                                          )}></MiniCard>
                                <MiniCard title={"High"}
                                          content={currentVideo["video_frame_high_engagement"]}
                                          color={LEVEL_COLOR.HIGH}
                                          active={getMax(
                                              currentVideo["video_frame_high_engagement"],
                                              currentVideo["video_frame_medium_engagement"],
                                              currentVideo["video_frame_low_engagement"],
                                          )}></MiniCard>
                            </div>
                        </div>
                    </div> : null}
            </Grid>
        </Grid>
    </div>
}

export default Results;