const { test, expect } = require('@playwright/test');
//const exp = require('constants');
test('User can add a task', async({page})=>{
    await page.goto('http://localhost:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    const createdTask = await page.textContent('.task');
    expect(createdTask).toContain('Test Task');
    });
test('User can delete a task', async({page})=>{
    await page.goto('http://localhost:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    await page.click('.task .delete-task');
    const deletedTasks = await page.$$eval('.task',
        tasks => tasks.map(task => task.textContent));
    expect(deletedTasks).not.toContain('Test Task');
    });
test('User can mark a task to complete', async({page})=>{
    await page.goto('http://localhost:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    await page.click('.task .task-complete');
    const completedTasks = await page.$('.task.completed');
    expect(completedTasks).not.toBeNull();
    });
test('User can filters tasks', async({page})=>{
    await page.goto('http://localhost:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    await page.click('.task .task-complete');
    await page.selectOption('#filter', 'Completed');
    const incompletedTasks = await page.$('.task:not(.completed)');
    expect(incompletedTasks).toBeNull();
    });