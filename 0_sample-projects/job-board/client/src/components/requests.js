const endpointURL = "http://localhost:9000/graphql";

export async function loadJobs() {
  const response = await fetch(endpointURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
        jobs {
          id
          title
          company {
            id
            name
            description
          }
          description
        }
      }
      `,
    }),
  });
  const responseBody = await response.json();
  return responseBody.data.jobs;
}
