# Recommender Scoring Notes

This note documents the revised logic for the two recommender questions in `index.html`.

## Questions involved
1. `recommenderCount`
2. `recommenderQuality`

## Design principle
These two questions should not be scored as independent additive blocks.

Correct model:
- recommender count provides the base and ceiling
- recommender quality provides bounded uplift within that ceiling
- uncertainty should suppress score, not coexist with strong quality signals

## Interaction rules
- `recommenderQuality` is multi-select
- `我不确定他们是否符合要求` is exclusive
- if previous question is `0 位`, the quality question is auto-filled as uncertain and skipped
- max selectable quality items should follow recommender count dynamically

## Scoring rules
### Base count score
- 0 位 -> 0
- 1 位 -> 2
- 2 位 -> 5
- 3 位 -> 8
- 4 位或以上 -> 10

### Quality score caps
- 0 位 -> cap 0
- 1 位 -> cap 3
- 2 位 -> cap 6
- 3 位 -> cap 8
- 4 位或以上 -> cap 10

### Quality raw weights
- 和我有真实合作经历 -> +3
- 来自不同机构 -> +2
- 在行业内有一定分量或认可度 -> +3
- 我有把握他们能写出具体内容 -> +2
- 我不确定他们是否符合要求 -> special handling, no normal additive score

### Hard caps on total recommender score
- 0 位 -> total cap 2
- 1 位 + uncertain only -> total cap 3
- 1 位 -> total cap 5
- 2 位 -> total cap 9

## Why this exists
Without these caps, users with very few or uncertain recommenders could still look artificially strong because confidence or quality selections inflate the score too much.

## Boundary expectations
- 0 位 + uncertain -> very low recommender score
- 1 位 + uncertain -> still low
- 1 位 + strong qualities -> low to lower-mid only
- 2 位 + strong qualities -> mid ceiling
- 3 位+ + strong qualities -> can become genuinely strong
