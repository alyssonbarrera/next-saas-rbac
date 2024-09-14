import { defineAbilityFor, projectSchema } from '@saas/auth'

const ability = defineAbilityFor({ id: 'user-id', role: 'MEMBER' })

const project = projectSchema.parse({
  id: 'project-1',
  ownerId: 'user-id',
})

console.log(ability.can('get', 'Billing')) // false
console.log(ability.can('create', 'Invite')) // false
console.log(ability.can('delete', project)) // true
