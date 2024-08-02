/**
 * @swagger
 * tags:
 *   - name: Contracts
 *     description: Endpoints related to contracts management
 */

/**
 * @swagger
 * /contracts:
 *   get:
 *     summary: Get all contracts for the logged-in user
 *     description: Retrieve all contracts associated with the logged-in user's account.
 *     tags: [Contracts]
 *     responses:
 *       200:
 *         description: A list of contracts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contract'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /contracts/{id}:
 *   get:
 *     summary: Get a contract by ID for the logged-in user
 *     description: Retrieve a specific contract by ID associated with the logged-in user's account.
 *     tags: [Contracts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the contract to retrieve
 *     responses:
 *       200:
 *         description: The contract object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contract'
 *       404:
 *         description: Contract not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /contracts:
 *   post:
 *     summary: Create a new contract
 *     description: Create a new contract for the logged-in user's account.
 *     tags: [Contracts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               months_amount:
 *                 type: number
 *               value:
 *                 type: number
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               renter_id:
 *                 type: number
 *               apartment_id:
 *                 type: number
 *               is_expired:
 *                 type: boolean
 *               months_upgrade:
 *                 type: number
 *     responses:
 *       200:
 *         description: The created contract object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contract'
 *       414:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /contracts/{id}:
 *   put:
 *     summary: Update an existing contract
 *     description: Update the details of an existing contract by its ID.
 *     tags: [Contracts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contract ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               months_amount:
 *                 type: number
 *               value:
 *                 type: number
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               renter_id:
 *                 type: number
 *               apartment_id:
 *                 type: number
 *               is_expired:
 *                 type: boolean
 *               months_upgrade:
 *                 type: number
 *               upgrade_value:
 *                 type: number
 *               upgrade_start_date:
 *                 type: string
 *                 format: date
 *               upgrade_end_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: The updated contract object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contract'
 *       404:
 *         description: Contract not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /contracts/{id}:
 *   delete:
 *     summary: Delete an existing contract
 *     description: Delete a contract by its ID. If the contract has associated payments, it will be marked as cancelled instead of being deleted.
 *     tags: [Contracts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contract ID
 *     responses:
 *       204:
 *         description: Contract successfully deleted or marked as cancelled
 *       404:
 *         description: Contract not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
