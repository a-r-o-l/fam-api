/**
 * @swagger
 * tags:
 *   - name: Renters
 *     description: Endpoints related to renters management
 */

/**
 * @swagger
 * /renters:
 *   get:
 *     summary: Get all renters
 *     description: Retrieve a list of renters. Optionally filter by building ID.
 *     tags: [Renters]
 *     parameters:
 *       - in: query
 *         name: buildingId
 *         schema:
 *           type: string
 *         description: Comma-separated list of building IDs to filter renters by
 *     responses:
 *       200:
 *         description: A list of renters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Renter'
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
 * /renters/{id}:
 *   get:
 *     summary: Get a renter by ID
 *     description: Retrieve a renter by their ID.
 *     tags: [Renters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The renter ID
 *     responses:
 *       200:
 *         description: A renter object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Renter'
 *       404:
 *         description: Renter not found
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
 * /renters/contract/{activeContractId}:
 *   get:
 *     summary: Get a renter by active contract ID
 *     description: Retrieve a renter by their active contract ID.
 *     tags: [Renters]
 *     parameters:
 *       - in: path
 *         name: activeContractId
 *         required: true
 *         schema:
 *           type: string
 *         description: The active contract ID
 *     responses:
 *       200:
 *         description: A renter object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Renter'
 *       404:
 *         description: Renter not found
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
 * /renters:
 *   post:
 *     summary: Create a new renter
 *     description: Create a new renter with the provided details.
 *     tags: [Renters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: First name of the renter
 *               lastname:
 *                 type: string
 *                 description: Last name of the renter
 *               email:
 *                 type: string
 *                 description: Email address of the renter
 *               dni:
 *                 type: string
 *                 description: DNI of the renter
 *               phone:
 *                 type: string
 *                 description: Phone number of the renter
 *               image_url:
 *                 type: string
 *                 description: Image URL of the renter
 *     responses:
 *       200:
 *         description: The created renter object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Renter'
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
 * /renters/{id}:
 *   put:
 *     summary: Update an existing renter
 *     description: Update the details of an existing renter by ID.
 *     tags: [Renters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the renter to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: First name of the renter
 *               lastname:
 *                 type: string
 *                 description: Last name of the renter
 *               email:
 *                 type: string
 *                 description: Email address of the renter
 *               dni:
 *                 type: string
 *                 description: DNI of the renter
 *               phone:
 *                 type: string
 *                 description: Phone number of the renter
 *               image_url:
 *                 type: string
 *                 description: Image URL of the renter
 *               active_apartment_id:
 *                 type: string
 *                 description: ID of the active apartment
 *               active_contract_id:
 *                 type: string
 *                 description: ID of the active contract
 *     responses:
 *       200:
 *         description: The updated renter object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Renter'
 *       404:
 *         description: Renter not found
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
 * /renters/{id}:
 *   delete:
 *     summary: Delete a renter
 *     description: Delete a renter by ID if they have no associated contracts.
 *     tags: [Renters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the renter to delete
 *     responses:
 *       204:
 *         description: Renter deleted successfully
 *       410:
 *         description: Cannot delete renter with contracts
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
