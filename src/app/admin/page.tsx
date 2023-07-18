import Button from "@/components/buttons/Button";
import ButtonLink from "@/components/links/ButtonLink";

export default function ComponentPage() {

  return (
    <main>
      <section>
        <div className='flex flex-col items-center justify-center px-6 py-14 gap-5'>
          <h1 className="text-xl">Admin</h1>
          <Button onClick={launchMessaging}>{"Launch L2->L1 messaging"} </Button>
          <Button onClick={consumeL2}>consumeL2</Button>
        </div>

      </section>
    </main>
  );

  function launchMessaging() {

  }
  function consumeL2() {

  }
}

