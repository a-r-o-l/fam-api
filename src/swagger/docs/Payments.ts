/**
 * @swagger
 * tags:
 *   - name: Payments
 *     description: Endpoints related to payments management
 */

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Retrieve a list of payments
 *     description: Retrieve a list of payments for the authenticated user's account. Optionally filter by renter ID.
 *     tags: [Payments]
 *     parameters:
 *       - in: query
 *         name: renterId
 *         schema:
 *           type: string
 *         required: false
 *         description: The ID of the renter to filter payments by
 *     responses:
 *       200:
 *         description: A list of payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   value:
 *                     type: number
 *                   date:
 *                     type: string
 *                   payed:
 *                     type: boolean
 *                   receipt:
 *                     type: string
 *                   contract_id:
 *                     type: number
 *                   Contract:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       Renter:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                       Apartment:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                           Building:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: number
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
 * /payments/{id}:
 *   get:
 *     summary: Retrieve a single payment
 *     description: Retrieve a single payment by its ID for the authenticated user's account.
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The payment ID
 *     responses:
 *       200:
 *         description: A single payment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 value:
 *                   type: number
 *                 date:
 *                   type: string
 *                 payed:
 *                   type: boolean
 *                 receipt:
 *                   type: string
 *                 contract_id:
 *                   type: number
 *       404:
 *         description: Payment not found
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
 * /payments:
 *   post:
 *     summary: Create a new payment
 *     description: Create a new payment for a specific contract. Ensures no duplicate payments for the same contract in the same month.
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: number
 *               date:
 *                 type: string
 *               receipt:
 *                 type: string
 *               contract_id:
 *                 type: number
 *               renter_id:
 *                 type: number
 *               apartment_id:
 *                 type: number
 *               payed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: The created payment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 value:
 *                   type: number
 *                 date:
 *                   type: string
 *                 receipt:
 *                   type: string
 *                 contract_id:
 *                   type: number
 *                 renter_id:
 *                   type: number
 *                 apartment_id:
 *                   type: number
 *                 payment_number:
 *                   type: number
 *                 account_id:
 *                   type: number
 *                 payed:
 *                   type: boolean
 *       400:
 *         description: Duplicate payment error
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
 * /payments/{id}:
 *   put:
 *     summary: Update an existing payment
 *     description: Update the details of an existing payment by its ID.
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: number
 *               date:
 *                 type: string
 *               receipt:
 *                 type: string
 *               payed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: The updated payment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 value:
 *                   type: number
 *                 date:
 *                   type: string
 *                 receipt:
 *                   type: string
 *                 contract_id:
 *                   type: number
 *                 renter_id:
 *                   type: number
 *                 apartment_id:
 *                   type: number
 *                 payment_number:
 *                   type: number
 *                 account_id:
 *                   type: number
 *                 payed:
 *                   type: boolean
 *       404:
 *         description: Payment not found
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
 * /payments/{id}:
 *   delete:
 *     summary: Delete a payment
 *     description: Delete a payment by its ID.
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The payment ID
 *     responses:
 *       204:
 *         description: Payment deleted successfully
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
