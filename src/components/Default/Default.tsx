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
        src={props.image}
        alt={props.image}
      />
      <div>
        <div className={page.link}>
          <a href={props.url} target="_blank">{props.url}</a>
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
      </div>
    </section>
  )
}