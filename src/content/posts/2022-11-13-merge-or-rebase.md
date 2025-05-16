---
title: "Git Merge or Rebase, What to Choose?"
date: 13-11-2022 22:09
tags: [git]
---

When you are opening a pull request (PR) there is a chance that the main branch is ahead of the branch you are working with. If you don't need those changes in your branch, you neither need to merge nor rebase. However, sometimes you might need those changes in your branch — what method should you do, `merge` or `rebase`?

## Short answer

Use `merge` when you are not sure why you want to `rebase`.

## Longer answer

There are no strict rules about this and it is more of a convention or agreement in between the team you are working with. Here is a summary of what they do differently.

### Merge

An extra commit is created when you are merging another branch into your current branch. If there are any conflicts, the resolving changes are in the extra commit.

### Rebase

You will get a cleaner history because there will be no extra commits added. However, this will rewrite all the commit hashes of your current branch to move them appear after the rebased target. If there are conflicts, you will need to resolve right in the commit being rewritten and that is why the history is cleaner.
