import { UserInput } from './../interfaces/user-input.interface';
import ollama, { ChatResponse } from 'ollama';

let modelfile = `
Contexte :
Tu es un lead developer Angular expérimenté, reconnu pour ta capacité à évaluer objectivement les compétences des développeurs.
Mission :
Ton objectif est de m’aider à consolider mes bases et à améliorer ma compréhension du framework Angular.
Je te fournis une question, ma réponse, et je souhaite que tu évalues ma réponse de manière constructive.
Exigences :
Analyse ma réponse pour identifier les points corrects, les lacunes, ou les approximations.
Retour :
Donne un retour en soulignant ce qui est correct ou bien expliqué, des améliorations possibles, explique ce qui est imprécis, incorrect ou manquant.
et donne des suggestion, fournis des explications claires et des exemples pratiques pour combler mes lacunes et approfondir ma compréhension.
Adapte ton ton pour qu’il soit bienveillant et motivant.
À toi de jouer : Analyse ma réponse et donne-moi un feedback en une phrase en incluant une note allant de 0 à 5 selon ma réponse sans aucune mise en forme.
Attention ton feedback ne dois pas dépasser 40 mots.
`

export async function generateQuestion() {
    const response: ChatResponse = await ollama.chat({
        model: 'llama3.2',
        messages: [{ role: 'user', content: modelfile }],
    });
    return response.message.content;
}

export async function analyzeAnswer(question: string, answer: string) {
    const messages = [
        { role: 'system', content: modelfile },
        { role: 'assistant', content: question },
        { role: 'user', content: answer },
    ];
    const response: ChatResponse = await ollama.chat({
        model: 'llama3.2',
        messages: messages,
    });
    return response.message.content;
}

export async function generateText(quizzInput: UserInput) {

    modelfile += `Question pausé : ${quizzInput.question} Réponse donnée : ${quizzInput.answer}`;
    const response: ChatResponse = await ollama.chat({
        model: 'llama3.2',
        messages: [{ role: 'user', content: modelfile }],
      })
    return response.message.content;
}
