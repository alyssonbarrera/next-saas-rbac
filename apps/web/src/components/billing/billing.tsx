import { Fragment } from 'react'

import { getCurrentOrg } from '@/auth'
import { getBillingRequest } from '@/http/requests/organizations/get-billing-request'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Separator } from '../ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

export async function Billing() {
  const currentOrganization = await getCurrentOrg()
  const { billing } = await getBillingRequest(currentOrganization!)

  function formatCurrency(value: number) {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  }

  return (
    <Fragment>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
          <CardDescription>
            Information about your organization cost
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cost Type</TableHead>
                <TableHead
                  className="text-right"
                  style={{
                    width: 120,
                  }}
                >
                  Quantity
                </TableHead>
                <TableHead
                  className="text-right"
                  style={{
                    width: 200,
                  }}
                >
                  Subtotal
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>Amount of projects</TableCell>
                <TableCell className="text-right">
                  {billing.projects.amount}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(billing.projects.price)} (
                  {formatCurrency(billing.projects.unit)} each)
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Amount of seats</TableCell>
                <TableCell className="text-right">
                  {billing.seats.amount}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(billing.seats.price)} (
                  {formatCurrency(billing.seats.unit)} each)
                </TableCell>
              </TableRow>
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell />
                <TableCell className="text-right">Total</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(billing.total)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </Fragment>
  )
}
