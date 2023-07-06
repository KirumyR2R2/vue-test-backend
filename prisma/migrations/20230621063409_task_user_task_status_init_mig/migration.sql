-- CreateEnum
CREATE TYPE "taskStatus" AS ENUM ('Pending', 'Processing', 'Complete');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "taskTitle" TEXT NOT NULL,
    "taskBody" TEXT NOT NULL,
    "task_from" TIMESTAMP(3),
    "task_to" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "taskStatus" "taskStatus" NOT NULL,
    "taskUserId" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Task_taskTitle_key" ON "Task"("taskTitle");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskUserId_fkey" FOREIGN KEY ("taskUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
