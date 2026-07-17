# AI Workflow Comparison

For this exercise, I implemented the same React settings form using two different AI prompting approaches.

## Round 1 - Vague Prompt

I used a simple one-sentence prompt: "Build a settings form in React."

The AI generated a working form with validation, but I had to review the output carefully. The implementation worked, but I had less understanding of why certain decisions were made. The response also required more manual checking.

## Round 2 - Precise Prompt

I started with a planning step before implementation. The prompt included project context, requirements, accessibility expectations, constraints, testing, and a verification step.

The AI first created an implementation plan, waited for approval, then implemented the feature, added tests, updated the README, and explained how to verify the result.

## Comparison

Round 2 produced a more complete solution. It included accessibility improvements, reusable validation helpers, automated tests, and a clearer project structure. The code required less review because expectations were defined before implementation.

Round 1 was faster to start but took more effort to review. Round 2 took longer initially because of planning, but less time was needed to verify the final result.

## AI Mistake I Caught

The AI ignored one of my project rules and explained the implementation in English instead of Roman Urdu. I had to ask for simpler explanations. This reminded me that AI instructions should always be verified rather than assumed to be followed automatically.

## Conclusion

This exercise showed that detailed prompts with planning and verification produce more reliable results than vague prompts. Spending more time defining requirements reduced review effort and increased confidence in the final implementation.