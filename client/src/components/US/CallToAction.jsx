import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row gap-2 p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about Javascript</h2>
        <p className="text-gray-500 my-2">
          Checkout the resources with 100 Javascript projects
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://100jsprojects.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            100 Javsacript Projects
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://imgs.search.brave.com/QdC55PB7JoSU-3I_X_Sn0Ch-YQLdNrGEF6qi8ZG8opM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTU1/MzU0NzU1MS9waG90/by93ZWItZGV2ZWxv/cG1lbnQtY29uY2Vw/dC1jcmVhdGlvbi1k/aWdpdGFsLXNvZnR3/YXJlLW9uLXdlYi12/aWEtbGFwdG9wLXBy/b2dyYW1taW5nLWFu/ZC53ZWJwP2E9MSZi/PTEmcz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/cVd0TE9BaldnU3VW/cVE3SFZDemdaTzhC/RTJTdnp1dnd1Z0NI/OXV6WTd1cz0"
          alt="javascript-img"
        />
      </div>
    </div>
  );
}
