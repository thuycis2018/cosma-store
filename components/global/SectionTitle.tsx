import { Separator } from "@/components/ui/separator";

function SectionTitle({ text }: { text: string }) {
  const testid = text.toLowerCase().replace(" ", "-");
  return (
    <div>
      <h2
        className='text-3xl font-medium tracking-wider capitalize mb-8'
        data-testid={testid}
      >
        {text}
      </h2>
      <Separator role='separator' />
    </div>
  );
}
export default SectionTitle;
