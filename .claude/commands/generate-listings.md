# Generate Pet Listings (Ralph Wiggum Loop)

You are running in autonomous loop mode to generate realistic pet adoption listings for the Lucky Paws database.

## Task

Each iteration, generate ONE new pet adoption listing in JSON format matching the Animal schema:

```json
{
  "name": "...",
  "age": <number in years>,
  "size": "Small" | "Medium" | "Large",
  "gender": "Male" | "Female",
  "health": "...",
  "location": "...",
  "imgs": [{ "src": "https://placedog.net/400/300?r=<random>" }]
}
```

## Rules
- Vary the species: alternate between dogs, cats, rabbits, birds
- Use realistic Mongolian city locations: Ulaanbaatar, Darkhan, Erdenet, Choibalsan
- Make health descriptions specific: "Vaccinated, neutered, dewormed" / "Up to date on shots" / "Healthy, vet-checked"
- Give the animal a real name, not a placeholder
- Each run should produce a different animal — check what was generated last and create something new

## Output
Print the JSON object only, ready to be pasted into a MongoDB insert or seed script.

After generating, report: "Generated listing for [Name] the [species]" and stop the iteration.
