const posts = (adminUserId) => [
  {
    title: 'Discovering Paris: The City of Light',
    content: `
      <article>
        <h2>Exploring Paris</h2>
        <p>Paris, the capital of France, is known worldwide as the "City of Light" for its rich history, breathtaking architecture, and cultural influence. From the Eiffel Tower to the Louvre Museum, Paris offers an endless array of wonders to explore.</p>
        <p>Whether you're visiting for the first time or rediscovering the city, some must-see attractions include:</p>
        <ul>
          <li><strong>The Eiffel Tower:</strong> An iconic landmark offering stunning views of the city.</li>
          <li><strong>The Louvre Museum:</strong> Home to masterpieces like the Mona Lisa and the Venus de Milo.</li>
          <li><strong>Notre-Dame Cathedral:</strong> A masterpiece of Gothic architecture with a fascinating history.</li>
          <li><strong>Montmartre & Sacré-Cœur:</strong> A charming district with breathtaking views and artistic heritage.</li>
        </ul>
      </article>
    `,
    image: 'http://localhost:3000/images/paris.jpg',
    category: 'travel',
    slug: 'discovering-paris',
    userId: adminUserId,
  },
  {
    title: 'Rome: The Eternal City',
    content: `
      <article>
        <h2>Exploring Rome</h2>
        <p>Rome, the capital of Italy, is a city rich in history, art, and architecture. As the heart of the Roman Empire and the birthplace of Western civilization, it is filled with ancient ruins, stunning basilicas, and vibrant culture.</p>
        <p>Some must-see attractions include:</p>
        <ul>
          <li><strong>The Colosseum:</strong> A grand amphitheater that once hosted gladiator battles.</li>
          <li><strong>The Vatican City:</strong> Home to St. Peter's Basilica and the Sistine Chapel.</li>
          <li><strong>The Trevi Fountain:</strong> A stunning Baroque masterpiece where visitors toss coins for good luck.</li>
          <li><strong>The Pantheon:</strong> A remarkable ancient temple with a magnificent dome.</li>
        </ul>
      </article>
    `,
    image: 'http://localhost:3000/images/rome.jpg',
    category: 'travel',
    slug: 'exploring-rome',
    userId: adminUserId,
  },
  {
    title: 'Laponia: The Land of the Northern Lights',
    content: `
      <article>
        <h2>Exploring Lapland</h2>
        <p>Lapland, known for its breathtaking winter landscapes, is one of the best places on Earth to witness the Northern Lights. It stretches across Norway, Sweden, Finland, and Russia, offering unique experiences for nature lovers and adventurers.</p>
        <p>Top activities in Lapland include:</p>
        <ul>
          <li><strong>Chasing the Northern Lights:</strong> Witnessing the aurora borealis in the Arctic sky.</li>
          <li><strong>Husky and Reindeer Safaris:</strong> Exploring snowy landscapes with sleds.</li>
          <li><strong>Visiting Santa Claus Village:</strong> A magical experience in Rovaniemi, Finland.</li>
          <li><strong>Ice Hotels and Snow Igloos:</strong> Sleeping in a room made entirely of ice.</li>
        </ul>
      </article>
    `,
    image: 'http://localhost:3000/images/laponie.jpg',
    category: 'travel',
    slug: 'exploring-lapland',
    userId: adminUserId,
  },
  {
    title: 'Understanding Bitcoin: The Digital Gold',
    content: `
      <article>
        <h2>What is Bitcoin?</h2>
        <p>Bitcoin is a decentralized digital currency that allows peer-to-peer transactions without intermediaries. Created by an unknown person or group under the pseudonym Satoshi Nakamoto, it has revolutionized the financial world.</p>
        <p>Key concepts of Bitcoin:</p>
        <ul>
          <li><strong>Blockchain Technology:</strong> A decentralized ledger that records all transactions.</li>
          <li><strong>Mining:</strong> The process of verifying and adding transactions to the blockchain.</li>
          <li><strong>Security and Anonymity:</strong> Bitcoin transactions offer privacy and security.</li>
          <li><strong>Limited Supply:</strong> Only 21 million bitcoins will ever exist, making it a scarce asset.</li>
        </ul>
      </article>
    `,
    image: 'http://localhost:3000/images/bitcoin.jpg',
    category: 'finance',
    slug: 'understanding-bitcoin',
    userId: adminUserId,
  },
  {
    title: 'Getting Started with TypeScript',
    content: `
      <article>
        <h2>Introduction to TypeScript</h2>
        <p>TypeScript is a statically typed superset of JavaScript that enhances development by providing type safety, better tooling, and improved maintainability. It is widely used in modern web development.</p>
        <p>Why use TypeScript?</p>
        <ul>
          <li><strong>Static Typing:</strong> Helps prevent errors before runtime.</li>
          <li><strong>Improved Code Readability:</strong> Easier to understand and maintain.</li>
          <li><strong>Better Developer Experience:</strong> Autocompletion, interfaces, and strong tooling.</li>
          <li><strong>Seamless JavaScript Integration:</strong> Works with existing JavaScript projects.</li>
        </ul>
      </article>
    `,
    image: 'http://localhost:3000/images/code.jpg',
    category: 'programming',
    slug: 'getting-started-typescript',
    userId: adminUserId,
  },
  {
    title: 'Next.js: The Future of React Development',
    content: `
      <article>
        <h2>Why Choose Next.js?</h2>
        <p>Next.js is a React framework that enables server-side rendering, static site generation, and API routes. It is widely used for modern web applications and offers an excellent developer experience.</p>
        <p>Key features of Next.js:</p>
        <ul>
          <li><strong>Server-Side Rendering (SSR):</strong> Enhances performance and SEO.</li>
          <li><strong>Static Site Generation (SSG):</strong> Pre-renders pages for speed and efficiency.</li>
          <li><strong>API Routes:</strong> Allows backend functionality within a React app.</li>
          <li><strong>Automatic Code Splitting:</strong> Loads only what is needed for faster performance.</li>
        </ul>
      </article>
    `,
    image: 'http://localhost:3000/images/code.jpg',
    category: 'programming',
    slug: 'nextjs-future-react',
    userId: adminUserId,
  },
];

export default posts;
