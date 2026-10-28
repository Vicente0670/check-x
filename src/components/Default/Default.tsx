import page from "./page.module.css";
import type { OpenGraph } from "../../MessageTypes";

export default function Default(props: OpenGraph) {
  return (
    <section className={page.main}>
      <div className={page.header}>
        <small>OpenGraph</small>
      </div>
      <img
        className={page.image}
        src={props.image ?? "unknown.svg"}
        alt={props.image}
        style={{ filter: `drop-shadow(4px 4px 0px ${props["theme-color"]})` }}
      />
      <div>
        <div className={page.link}>
          <a href={props.url} target="_blank">{props.url ?? "Not found"}</a>
          <samp>OG:URL</samp>
        </div>
        <div className={page.title}>
          <h2>{props.title}</h2>
          <samp>OG:TITLE</samp>
        </div>
        <div className={page.description}>
          <p>{props.description}</p>
          <samp>OG:DESCRIPTION</samp>
        </div>
        <div className={page.imageUrl}>
          <a href={props.image} target="_blank">{props.image}</a>
          <samp>OG:IMAGE</samp>
        </div>
        <div className={page.themeColor}>
          <input type="color" disabled value={props["theme-color"] ?? "#1c1c1c"} />
          <p>{props["theme-color"] ?? "No color in meta tags"}</p>
          <samp>THEME-COLOR</samp>
        </div>
      </div>
    </section>
  )
}