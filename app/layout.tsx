import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {title:"CivicThread · The public record, with memory",description:"Fictional sourced civic-issue timeline prototype"};
export default function Layout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
