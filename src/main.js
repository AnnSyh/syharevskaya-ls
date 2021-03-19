import "./styles/main.pcss";
import "./scripts/skills";

if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}


