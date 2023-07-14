let open_respones;

let chat = [
  { role: "user", content: "Hi" },
  { role: "assistant", content: "Hi, how Ican help you today" },
];

async function chatUserAdd(feeling, question) {
  chat.push({
    role: "user",
    content:
      "My happiness from 0=10 is " + feeling + ". My input is: " + question,
  });
}

async function chatAssistantAdd(res) {
  chat.push({ role: "assistant", content: res });
}

async function openai_test() {
  let url = "https://api.openai.com/v1/chat/completions";
  let part1 = "sk";
  let part2 = "-RAtWR9nJwrgLF6Ml4nwq";
  let part3 = "T3BlbkFJT5tJv54MBU4s9EEIghTq";

  let allParts = part1 + part2 + part3;

  let data = {
    model: "gpt-3.5-turbo",
    messages: chat,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${allParts}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      const message = responseData.choices[0].message.content;

      chatAssistantAdd(message);

      const speech = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(speech);
      return message;
    }
  } catch (error) {
    console.log(error);
  }
}
