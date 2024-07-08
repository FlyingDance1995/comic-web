<script setup>
import { useTeamStore } from '@/store/teams';

await useTeamStore().fetchTeams({
    ordering: "-modification_time",
    page: 1,
    size: 500
});
</script>

<template>
    <TeamsContent />
</template>
