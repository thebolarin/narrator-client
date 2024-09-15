<template>
  <div class="max-w-none">
    <main class="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div class="mb-10 lg:flex lg:items-center lg:justify-between">
        <div class="min-w-0 flex-1">
          <h1
            class="text-2xl font-bold leading-7 text-gray-700 sm:truncate sm:text-3xl sm:tracking-tight"
            style="margin-bottom: 0"
          >
            {{ msg }}
          </h1>
        </div>
        <div
          v-show="openCreateProjectModal"
          class="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <!-- Background backdrop -->
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-out duration-300"
            aria-hidden="true"
            @click="openCreateProjectModal = false"
          />

          <!-- Modal panel -->
          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div
              class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
              @click="openCreateProjectModal = false"
            >
              <transition
                enter-active-class="ease-out duration-300"
                enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                leave-active-class="ease-in duration-200"
                leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div
                  v-if="openCreateProjectModal"
                  class="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                  style="background: #f8f8f7"
                  @click.stop
                >
                  <div
                    class="px-4 pb-4 pt-5 sm:p-6 sm:pb-4"
                    style="background: #f8f8f7"
                  >
                    <div class="sm:flex sm:items-start">
                      <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <div class="mt-2">
                          <form>
                            <div class="space-y-12">
                              <div class="border-b border-gray-900/10 pb-12">
                                <div class="flex items-center justify-between pb-3">
                                  <h2 class="text-base font-semibold leading-7 text-gray-900">
                                    New Research Project
                                  </h2>
                                  <div
                                    class="z-50 cursor-pointer modal-close"
                                    @click="openCreateProjectModal = false"
                                  >
                                    <svg
                                      class="text-black fill-current hover:text-red-500"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="18"
                                      height="18"
                                      viewBox="0 0 18 18"
                                    >
                                      <path
                                        d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <p class="mt-1 text-sm leading-6 text-gray-600">
                                  This information will be displayed publicly so be careful what you share.
                                </p>

                                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                  <div class="col-span-full">
                                    <label
                                      for="name"
                                      class="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Research Name
                                    </label>
                                    <div class="mt-2">
                                      <input
                                        id="name"
                                        v-model="newProject.name"
                                        type="text"
                                        name="name"
                                        autocomplete="name"
                                        class="block w-full h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                      >
                                    </div>
                                  </div>

                                  <div class="col-span-full">
                                    <label
                                      for="description"
                                      class="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Description
                                    </label>
                                    <div class="mt-2">
                                      <textarea
                                        id="description"
                                        v-model="newProject.description"
                                        name="description"
                                        rows="3"
                                        class="block w-full rounded-md border-0 py-1.5 text-teal-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                      />
                                    </div>
                                    <p class="mt-3 text-sm leading-6 text-gray-600">
                                      Write a few description about your research.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      class="inline-flex w-full justify-center rounded-md bg-teal-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-900 sm:ml-3 sm:w-auto"
                      @click="createNewProject"
                    >
                      <div
                        v-if="submitLoading"
                        class="flex items-center"
                      >
                        <div
                          style="border-top-color:transparent"
                          class="w-6 h-6 border-4 border-gray-300 rounded-full animate-spin"
                        />
                        <!-- <span>processing ..</span> -->
                      </div>
                      <span v-else>Submit</span>
                    </button>


                    <button
                      type="button"
                      class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      @click="openCreateProjectModal = false"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div class="flex">
          <span class="hidden sm:block">
            <button
              aria-expanded="true"
              aria-haspopup="true"
              type="button"
              class="hover:shadow-md inline-flex items-center rounded-md px-3 py-2 text-sm font-normal text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              @click="openCreateProjectModal = true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              New Project
            </button>
          </span>
        </div>
      </div>


      <div v-if="loading">
        <!-- Skeleton Loader -->
        <div class="rounded-lg p-4 animate-pulse">
          <div class="w-2/3 h-4 bg-gray-300 rounded mb-2" />
          <div class="w-full h-8 bg-gray-300 rounded mb-2" />
          <div class="w-full h-8 bg-gray-300 rounded mb-2" />
        </div>
        <div class="rounded-lg p-4 animate-pulse mt-4">
          <div class="w-2/3 h-4 bg-gray-300 rounded mb-2" />
          <div class="w-full h-8 bg-gray-300 rounded mb-2" />
          <div class="w-full h-8 bg-gray-300 rounded mb-2" />
        </div>
      </div>
      
      <div v-else>
        <ul
          role="list"
          class="divide-y divide-gray-300"
        >
          <li
            v-for="project in projects"
            :key="project._id"
            class="flex justify-between gap-x-6"
          >
            <div class="flex mb-5 mt-5 min-w-0 gap-x-4">
              <div class="min-w-0 flex-auto">
                <p
                  class="hover:underline mb-5 hover:underline-offset-8 items-center text-lg hover:text-teal-800 hover:cursor-pointer max-w-64 font-semibold leading-relaxed text-gray-600"
                  @click.prevent="goToProjectDetails(project._id)"
                >
                  {{ project.name }}
                  <span class="inline-flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-5 w-5 font-bold text-teal-700"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                      />
                    </svg>
                  </span>
                </p>

                <p class="mt-1 text-sm leading-6 max-w-prose text-gray-600">
                  {{ project.description }}
                </p>
              </div>
            </div>
            <div class="flex mt-5 hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <div class="flex">
                <div class="flex-1 w-34 ...">
                  <p class="mt-3 text-xs leading-5 text-gray-500">
                    <span
                      v-if="project.status === 'Active'"
                      class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                    >{{
                      project.status }}</span>
                    <span
                      v-if="project.status === 'Inactive'"
                      class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                    >{{
                      project.status }}</span>
                  </p>
                  <p class="text-xs font-medium mt-4 leading-6 text-gray-500">
                    {{ formattedDate(project.createdAt) }}
                  </p>
                </div>
                <div class="flex justify-end w-14">
                  <button
                    class="rounded-md flex items-center justify-center hover:bg-stone-200 w-10 h-10"
                    @click="toggleDropdown(project._id)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-5 w-5 font-bold text-gray-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                  </button>

                  <div
                    v-show="dropdowns[project._id]"
                    class="fixed inset-0 z-10 w-full h-full"
                    @click="closeDropdown(project._id)"
                  />

                  <transition
                    enter-active-class="transition duration-150 ease-out transform"
                    enter-from-class="scale-95 opacity-0"
                    enter-to-class="scale-100 opacity-100"
                    leave-active-class="transition duration-150 ease-in transform"
                    leave-from-class="scale-100 opacity-100"
                    leave-to-class="scale-95 opacity-0"
                  >
                    <div
                      v-show="dropdowns[project._id]"
                      class="p-1 absolute z-10 right-10 mt-7 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabindex="-1"
                      @click="closeDropdown(project._id)"
                    >
                      <div
                        class="inline-flex w-full px-2 py-2 hover:bg-teal-50"
                        role="none"
                        @click.prevent="goToProjectHistory(project._id)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="h-4 w-4 font-bold text-teal-600"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                          />
                        </svg>

                        <a
                          id="menu-item-0"
                          href="#"
                          class="block pl-1 text-xs text-gray-700"
                          role="menuitem"
                          tabindex="-1"
                        >Recent History</a>
                      </div>
                      <div
                        class="inline-flex w-full px-2 py-2 hover:bg-red-50"
                        role="none"
                        @click.prevent="deleteProject(project._id)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="h-4 w-4 font-bold text-red-300"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        <a
                          id="menu-item-0"
                          href="#"
                          class="block pl-1 text-xs text-gray-700"
                          role="menuitem"
                          tabindex="-1"
                        >Delete Project</a>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef, ref } from 'vue'
import { globalState } from '../store'
import { ProjectService } from '../services/project.service'
import { formatDate } from '../utils/index'
import { Project } from '../utils/project.type'
const projectService = new ProjectService()

export default defineComponent({
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {
      count: toRef(globalState, 'count'),
      name: ref(''),
    }
  },
  data() {
    return {
      projects: [] as Project[],
      openCreateProjectModal: false,
      projectDropdownOpen: false,
      dropdowns: {} as { [key: string]: boolean },
      newProject: {
        name: '',
        description: '',
      },
      loading: false,
      submitLoading: false,
    }
  },
  mounted() {
    this.fetchAllProjects()
  },
  methods: {
    async fetchAllProjects() {
      this.loading = true // Start loading
      const fetchProjects = await projectService.fetchAll()
      this.projects = fetchProjects.data
      this.loading = false // End loading
    },
    formattedDate(dateString: Date) {
      return formatDate(dateString)
    },
    async createNewProject() {
      this.submitLoading = true
      await projectService.create(this.newProject)
      this.submitLoading = false
      this.openCreateProjectModal = false
      this.fetchAllProjects()
      this.newProject.name = ''
      this.newProject.description = ''

    },
    toggleDropdown(index: string): void {
      this.dropdowns[index] = !this.dropdowns[index]
    },
    closeDropdown(index: string): void {
      this.dropdowns[index] = false
    },
    async deleteProject(index: string) {
      await projectService.delete(index)
      this.dropdowns[index] = false
      this.fetchAllProjects()
    },
    goToProjectDetails (projectId: string): void {
      this.$router.push({ name: 'ProjectDetails', params: { id: projectId } })
      // router.push({ name: 'ProjectDetails', params: { id: projectId } })
    },
    goToProjectHistory(projectId: string): void {
      this.$router.push({ name: 'ProjectHistory', params: { id: projectId } })
      // router.push({ name: 'ProjectDetails', params: { id: projectId } })
    },
  },
})
</script>

<style>
.prose a {
  @apply text-gray-900 underline !important;
}
/* Optional styles for the transition */
.ease-out {
  transition: all 0.3s ease-out;
}
.ease-in {
  transition: all 0.2s ease-in;
}
</style>
