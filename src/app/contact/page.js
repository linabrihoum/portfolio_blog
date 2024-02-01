import ContactForm from "@/src/components/Contact/ContactForm";
import siteMetadata from "@/src/utils/siteMetaData";

// Custom metadata
export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: "Contact Me!",
  description: `Contact me or email me at ${siteMetadata.email} `, 
};



export default function Contact(){
    return <section> 
        <div>
            <ContactForm />
        </div>
         </section>
}