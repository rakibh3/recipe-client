const DevInfo = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <h1 className="text-6xl text-center font-bold mb-16">Developer Info</h1>
      <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-3 lg:gap-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl xl:text-4xl">
              Education
            </h2>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                Bachelor of Technology in Computer Science and Engineering
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Lovely Professional University, India
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Graduated: August 2023
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl xl:text-4xl">
            Skills
          </h2>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Programming Languages</h3>
            <p className="text-gray-500 dark:text-gray-400">
              JavaScript, TypeScript, Python
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Frameworks and Libraries</h3>
            <p className="text-gray-500 dark:text-gray-400">
              React, NextJS, Node.js, MongoDB, Mongoose, Prisma, SQL, Express
            </p>
          </div>
        </div>
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl xl:text-4xl">
              Certifications
            </h2>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                Web Development with Programming Hero - Batch 6
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Issued: December 2022
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevInfo;
