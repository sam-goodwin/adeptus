# Adeptus

Adeptus is a TypeScript-native implementation of the [Guidance](https://github.com/guidance-ai/guidance) Python project, except instead of mustache templates, it makes use of TypeScript's tagged template literals and generators so you can use the full power of code to control large language model generation.

# Install

```
npm install adeptus
```

# Example

```ts
const person = await ai.eval(function* () {
  const [name, age, armor, cls, strength, items] = yield* assistant`
    The following is a character profile for an RPG game in JSON format.
    \`\`\`json
    {
      "name": "${string}",
      "age": ${range(1, 100)},
      "armor": "${select("leather", "chainmail", "plate")}",
      "class": "${string}",
      "strength": ${match(/[0-9]+/)},
      "items": [
        ${repeat(3)`"${string}",`}
      ]
    }g
    \`\`\``;

  return {
    name,
    age,
    armor,
    class: cls,
    strength: Number(strength),
    items,
  };
});
```
