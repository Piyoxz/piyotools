<template>
  <div class="flex gap-2">
    <VaIconMenuCollapsed class="cursor-pointer" :class="{ 'x-flip': !isSidebarMinimized }" :color="collapseIconColor"
      @click="isSidebarMinimized = !isSidebarMinimized" />

    <nav class="flex items-center">
      <VaBreadcrumbs>
        <VaBreadcrumbsItem label="Home" :to="{ name: 'dashboard' }" />
        {{ items }}
        <VaBreadcrumbsItem v-for="(item, index) in items" :key="item.label" :label="item.label"
          @click="index !== items.length - 1 && handleBreadcrumbClick(item)" 
          :class="{ 'cursor-pointer': index !== items.length - 1 }" />
      </VaBreadcrumbs>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useColors } from 'vuestic-ui'
import VaIconMenuCollapsed from '../icons/VaIconMenuCollapsed.vue'
import downloaders from '../../pages/downloaders/data/downloaders.json'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '../../stores/global-store'
import NavigationRoutes from '../sidebar/NavigationRoutes'

const { isSidebarMinimized } = storeToRefs(useGlobalStore())

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

type BreadcrumbNavigationItem = {
  label: string
  to: string
  hasChildren: boolean
}

const findRouteName = (name: string) => {
  const traverse = (routers: any[]): string => {
    for (const router of routers) {
      if (
        router.name?.toString().includes(name) ||
        name.includes(router.name?.toString())
      ) {
        return router.displayName;
      }
      if (router.children) {
        const result = traverse(router.children);
        if (result) {
          return result;
        }
      }
    }
    return '';
  };

  return traverse(NavigationRoutes.routes);
};

const items = computed(() => {
  const result: { label: string; to: string; hasChildren: boolean }[] = [];

  route.matched.forEach((matchedRoute, index) => {
    const labelKey = findRouteName(matchedRoute.name as string);

    if (!labelKey) {
      return;
    }

    let dynamicLabel = '';
    const hasDynamicId = matchedRoute.path.includes(':id') && route.params.id;

    if (hasDynamicId) {
      const id = route.params.id;

      const baseRouteName = matchedRoute.name?.toString().split('-')[0];
      let dynamicItem = null;

      if (baseRouteName === 'downloaders') {
        dynamicItem = downloaders.find((item) => item.no === Number(id));
        if (!dynamicItem) {
          window.location.href = '/downloaders';
        }
      } 

      dynamicLabel = dynamicItem ? dynamicItem.name : `Unknown ID: ${id}`;
    }

    if (dynamicLabel) {
      // Tambahkan parent path (rute sebelumnya) sebelum breadcrumb detail
      const parentMatchedRoute = route.matched[index];
      if (parentMatchedRoute) {
        const parentLabelKey = findRouteName(parentMatchedRoute.name as string);
        result.push({
          label: t(parentLabelKey),
          to: `/${parentMatchedRoute.name.split('-')[0]}`,
          hasChildren: false,
        });
      }
      result.push({
        label: dynamicLabel,
        to: '',
        hasChildren: false,
      });
    } else {
      result.push({
        label: t(labelKey),
        to: matchedRoute.path,
        hasChildren: matchedRoute.children && matchedRoute.children.length > 0,
      });
    }
  });

  return result;
});

const { getColor } = useColors()

const collapseIconColor = computed(() => getColor('secondary'))

const handleBreadcrumbClick = (item: BreadcrumbNavigationItem) => {
  if (!item.hasChildren) {
    router.push(item.to)
  }
}
</script>

<style lang="scss" scoped>
.x-flip {
  transform: scaleX(-100%);
}
</style>
