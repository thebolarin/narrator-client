<template>
  <div class="flex items-center justify-between border-t border-gray-200 py-3 ">
    <div class="flex flex-1 justify-between sm:hidden">
      <a
        href="#"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        @click.prevent="prevPage"
      >Previous</a>
      <a
        href="#"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        @click.prevent="nextPage"
      >Next</a>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{ pageStart }}</span>
          to
          <span class="font-medium">{{ pageEnd }}</span>
          of
          <span class="font-medium">{{ totalCount }}</span>
          results
        </p>
      </div>
      <div>
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <a
            href="#"
            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            @click.prevent="prevPage"
          >
            <span class="sr-only">Previous</span>
            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
          <a
            v-for="pageNum in totalPages"
            :key="pageNum"
            href="#"
            :class="['relative inline-flex items-center px-4 py-2 text-sm font-semibold', {
              'bg-teal-800 text-white': pageNum === currentPage,
              'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50': pageNum !== currentPage
            }]"
            @click.prevent="goToPage(pageNum)"
          >{{ pageNum }}</a>
          <a
            href="#"
            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            @click.prevent="nextPage"
          >
            <span class="sr-only">Next</span>
            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>
  
  <script>
  export default {
    props: {
      totalCount: Number,
      pageSize: Number,
      currentPage: Number,
      totalPages: Number,
    },
    computed: {
      pageStart() {
        return (this.currentPage - 1) * this.pageSize + 1
      },
      pageEnd() {
        return Math.min(this.currentPage * this.pageSize, this.totalCount)
      },
    },
    methods: {
      prevPage() {
        if (this.currentPage > 1) {
          this.$emit('update:page', this.currentPage - 1)
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.$emit('update:page', this.currentPage + 1)
        }
      },
      goToPage(pageNum) {
        this.$emit('update:page', pageNum)
      },
    },
  }
  </script>
  