import '../App.css'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

function Health() {

  return (
    <>
      <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Health Check successful. App is live and working!
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    </>
  )
}

export default Health;
