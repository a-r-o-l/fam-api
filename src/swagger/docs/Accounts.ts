/**
 * @swagger
 * tags:
 *   - name: Accounts
 *     description: Endpoints related to account management
 */

/**
 * @swagger
 * /account/find/{search_params}:
 *   get:
 *     summary: Find an account by search parameters
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: search_params
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account found successfully
 */

/**
 * @swagger
 * /account:
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
 *     responses:
 *       200:
 *         description: Account created successfully
 */

/**
 * @swagger
 * /account/{accountId}:
 *   put:
 *     summary: Update an account by ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account updated successfully
 */

/**
 * @swagger
 * /account/password/{accountId}:
 *   put:
 *     summary: Change the current password
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 */

/**
 * @swagger
 * /account/password/{accountId}:
 *   post:
 *     summary: Create a new password for users without a password
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Password created successfully
 */

/**
 * @swagger
 * /account/{accountId}:
 *   delete:
 *     summary: Delete an account by ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account deleted successfully
 */

/**
 * @swagger
 * /account/password/check/{accountId}:
 *   post:
 *     summary: Check if the password matches
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Password match checked successfully
 */
