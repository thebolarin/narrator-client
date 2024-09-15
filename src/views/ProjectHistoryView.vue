<template>
  <div class="items-center justify-center p-4">
    <div>
      <h2 class="text-4xl font-bold text-teal-800">
        Recent Research
      </h2>
    </div>

    <div  v-if="researchs.length < 1" class="flex flex-col items-center py-20 text-sm leading-6 text-teal-900 md:py-32 lg:py-40">
      <svg
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        class="w-8 h-8"
      ><path
        d="m13 13 6 6m0-6-6 6m15-3c0 6.627-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4s12 5.373 12 12Z"
        stroke="#CBD5E1"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      </svg>
      <p class="mt-6">
        We can't find any research history found for this project
        <!-- <span class="font-semibold text-slate-900"></span>. -->
      </p>
      <!-- <p class="mt-1">
        If you can’t find what you’re looking for 
        <a
          class="font-semibold text-violet-600"
          href="https://github.com/tailwindlabs/heroicons/discussions/new?category=ideas"
        >make a suggestion on GitHub.
        </a>
      </p> -->
    </div>

    <div v-else class="max-w-3xl mt-4">
      <ul
        role="list"
        class="divide-y divide-gray-300"
      >
        <li 
          v-for="item in researchs"
          :key="item._id"
          class="flex justify-between gap-x-6"
        >
          <div class="flex mb-5 mt-5 min-w-0 gap-x-4">
            <div class="min-w-0 flex-auto">
              <p
                style="color:rgb(42, 75, 79);"
                class="hover:underline mb-2 hover:underline-offset-8 items-center text-base hover:text-teal-800 hover:cursor-pointer max-w-3xl font-semibold leading-relaxed text-gray-600"
              >
                {{ item.text }}
              </p>

              <p
                style="color:rgb(42, 75, 79); font-size: 13px;"
                class="mt-1 text-sm leading-6 max-w-3xl"
              >
                <span class="font-semibold">Narrative Analaysis: </span> {{ item.conclusion }}
              </p>
            </div>
          </div>
        </li>
      </ul>
      <pagination
        :total-count="totalCount"
        :page-size="pageSize"
        :current-page="currentPage"
        :total-pages="totalPages"
        @update:page="updatePage"
      />
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { ProjectService } from '../services/project.service'
import Pagination from '../components/PaginationComponent.vue'
const projectService = new ProjectService()

export default defineComponent({
  name: 'ResearchView',
  components: {
    Pagination,
  },
  data() {
    return {
      hasNextPage: false as boolean,
      hasPreviousPage: false as boolean,
      researchs: [] as any,
      totalCount: 0 as number,
      pageSize: 10 as number,
      currentPage: 1 as number,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalCount / this.pageSize)
    },
  },
  mounted() {
    this.fetchProjectResearch(this.$route.params.id as string, 1)
  },
  methods: {
    async fetchProjectResearch(id: string, pageNumber = 1) {
      try {
        const result: any = await projectService.fetchAllResearch(id, pageNumber)
        const {researchs, totalCount, page } = result.data
        this.researchs = researchs
        this.totalCount = totalCount
        this.currentPage = page
        
      } catch (err) {
        console.log('high')
      }

    },
    updatePage(page: number) {
      this.fetchProjectResearch(this.$route.params.id as string, page)
    },
  },
})
</script>

<style>
.line-through {
  text-decoration: line-through;
}
</style>